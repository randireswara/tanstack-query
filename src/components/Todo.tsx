import { useTodosIds } from "../services/queries";

export default function Todo() {
  const todosIdsQuery = useTodosIds();

  if (todosIdsQuery.isPending) {
    return <span>loading...</span>;
  }

  if (todosIdsQuery.isError) {
    return <span>there is an error!</span>;
  }

  return <></>;
}
