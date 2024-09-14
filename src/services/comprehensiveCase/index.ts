import { request } from "@umijs/max"
import { PATH_PREFIX } from "../pathPrefix"

export const queryPage = async (params: any) => {
  const {success,data,total} = await request(
    `${PATH_PREFIX}/departments`,
    {
      method: 'GET',
      params
    }
  )
  return {success,data,total}
}

export const queryPage1 = async (params: any) => {
  const {success,data,total} = await request(
    `${PATH_PREFIX}/emps`,
    {
      method: 'GET',
      params
    }
  )
  return {success,data,total}
}

export const deleteDept = async(id: number) => {
  const {success} = await request(
    `${PATH_PREFIX}/departments/${id}`,
    {
      method: 'DELETE',
    }
  )
  return {success}
}