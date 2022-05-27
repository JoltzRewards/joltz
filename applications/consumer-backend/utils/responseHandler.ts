import { Response } from 'express'

interface ResBody {
  success: boolean
  status: number
  data?: any
  error?: {
    code: string
    message: string
  }
}

type Send<T = Response> = (body?: ResBody) => T

export interface OperationResponse extends Response {
  json: Send<this>
}
