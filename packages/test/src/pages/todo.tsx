import { TodoContext, TodoForm, TodoList } from "../ToDoModule";
import useTodoContextValue from "../ToDoModule/hooks/useContextValue";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default () => {
  const todoContextValue = useTodoContextValue();

  return (
    <TodoContext.Provider value={todoContextValue}>
      <div>
        <TodoList todoList={todoContextValue.data} />
        <div style={{ textAlign: "right", margin: "2em" }}>
          <TodoForm />
        </div>
      </div>
    </TodoContext.Provider>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "todo"])),
  },
});
