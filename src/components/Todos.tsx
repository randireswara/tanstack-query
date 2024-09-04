import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "../services/mutations";
import { useTodos, useTodosIds } from "../services/queries";
import { Todo } from "../types/todo";

export default function Todos() {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data);

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const { register, handleSubmit } = useForm<Todo>();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data);
  };

  const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
    if (data) {
      updateTodoMutation.mutate({ ...data, checked: true });
    }
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodoMutation.mutateAsync(id);
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New todo : </h4>
        <input placeholder="Title" {...register("title")} />
        <br />
        <input placeholder="Description" {...register("description")} />
        <br />
        <input
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? "Creating..." : "Create todo"}
        />
      </form>

      {todosQueries.map(({ data }) => (
        <li key={data?.id}>
          <div>Id : {data?.id}</div>
          <span>
            <strong>Title : {data?.title}</strong>,{" "}
            <strong>Description : {data?.description}</strong>
          </span>
          <div>
            <button onClick={() => handleMarkAsDoneSubmit(data)}>
              {data?.checked ? "Done" : "Mark as done"}
            </button>
            {data && data.id && (
              <button onClick={() => handleDeleteTodo(data.id!)}>Delete</button>
            )}
          </div>
        </li>
      ))}
    </>
  );
}
