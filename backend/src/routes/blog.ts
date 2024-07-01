import { Hono } from "hono"
import { decode, jwt, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput, updateBlogInput } from "@100xdevs/medium-common"


export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables:{
        userId:string
    }
}>()

blogRouter.use('/*',async(c,next)=>{
    const authHeader = c.req.header("Authorization") || "";
    const user =await verify(authHeader,c.env.JWT_SECRET)
    if(user){
        c.set("userId",user.id)
        await next();
    }else{
        c.status(403);
        c.json({
            message:"you are not logged in"
        })
    }
    
})


blogRouter.post('/',async (c) => {
    const userId = c.get('userId');
    const blogData = await c.req.json();
    const {success} = createBlogInput.safeParse(blogData);

    if(!success){
      c.status(411)
      return c.json({
        message:"Inputs are incorrect"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    
    
    try {
        const blog = await prisma.post.create({
            data:{
                title:blogData.title,
                content:blogData.content,
                authorId:userId
            }
        })

        return c.json({
            id: blog.id
        });

    } catch (error) {
        c.status(411)
        return c.text("Error creating blog")
    }

})

blogRouter.put('/',async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const blogData = await c.req.json();
      const {success} = updateBlogInput.safeParse(blogData);
  
      if(!success){
        c.status(411)
        return c.json({
          message:"Inputs are incorrect"
          })
      }

    try {
        const updatedBlog = await prisma.post.update({
            where:{
                id:blogData.id,
                authorId:userId
            },
            data:{
                title:blogData.title,
                content:blogData.content
            }
        })

        return c.text('updated post');
    } catch (error) {
        c.status(403)
        return c.text("Error updating blog")
    }
})

blogRouter.get('/bulk',async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())


    try {
        const data = await prisma.post.findMany({
            select:{
                content:true,
                title:true,
                id:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }    
        })

        return c.json(data)
    } catch (error) {
        c.status(403)
        return c.text("Error finding blog")
    }
})

blogRouter.get('/:id',async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const id = c.req.param('id');

    try {
        const data = await prisma.post.findUnique({
            where:{
                id:id,
                authorId:userId
            }
        })

        return c.json(data)
    } catch (error) {
        c.status(403)
        return c.text("Error finding blog")
    }
})


