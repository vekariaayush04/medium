import { Hono } from "hono"
import { decode, jwt, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signupInput , signinInput } from "@100xdevs/medium-common"

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
}>()

userRouter.post('/signup',async (c)=>  {
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await  c.req.json();
    const {success} = signupInput.safeParse(body);

    if(!success){
      c.status(411)
      return c.json({
        message:"Inputs are incorrect"
        })
    }
  
    try {
      const user = await prisma.user.create({
        data : {
         email:body.username,
         password:body.password,
         name:body.name
        }
      });
  
      const payload = {
        id : user.id
      }
      const secret = c.env.JWT_SECRET
  
      const token = await sign(payload,secret)
  
      return c.json({token})
    } catch (error) {
      c.status(403)
      return c.json({
        message : "error while signing up..."
      })
    }
  
  })
  
  userRouter.post('signin',async(c) => {
    const body = await c.req.json();
    const secret = c.env.JWT_SECRET

    const {success} = signinInput.safeParse(body);

    if(!success){
      c.status(411)
      return c.json({
        message:"Inputs are incorrect"
        })
    }
  
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const findUser = await prisma.user.findUnique({
      where:{
        email : body.username,
        password : body.password
      }
    })
  
    if (!findUser) {
          c.status(403);
          return c.json({ error: "user not found" });
      }
  
      const token = await sign({ id: findUser.id }, secret);
      return c.json({ token });
  })