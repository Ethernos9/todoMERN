import zod from "zod"

const createTodo   = zod.object({
    title:zod.string(),
    desc :zod.string()
})
const updateTodo   = zod.object({
    id:zod.string(),
})

export{
  createTodo,
  updateTodo,

}
