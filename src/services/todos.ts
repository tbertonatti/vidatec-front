import { TODO } from "../models/todo";
import { HttpGet, HttpDelete, HttpPost, HttpPut } from "./http";
const baseUrl = "/todos";

export const GetTodos = (): Promise<TODO[]> => HttpGet(baseUrl);

export const DeleteTodo = (id: number): Promise<string> =>
  HttpDelete(`${baseUrl}/${id}`);

export const CreateTodo = (content: string): Promise<TODO> =>
  HttpPost(`${baseUrl}/create`, { content });

export const CompleteTodo = (id: number): Promise<string> =>
  HttpPut(`${baseUrl}/complete/${id}`);
