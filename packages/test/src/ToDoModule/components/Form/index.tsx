import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, InputAdornment } from "@mui/material";
import { useTranslation } from "next-i18next";

import { useYupValidationResolver } from "../../../Common";
import validationSchema from "./validationSchema";
import useTodoModule from "../../hooks/useModule";

interface IFormValues {
  readonly name: string;
}
const TodoForm = () => {
  const resolver = useYupValidationResolver<IFormValues>(validationSchema);
  const { t } = useTranslation("todo");
  const todoModule = useTodoModule();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver,
    defaultValues: { name: "" },
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const handleCreateTask = (values: IFormValues) => {
    todoModule.methods.create({ name: values.name, isComplete: false });
    setValue("name", "");
  };
  return (
    <form onSubmit={handleSubmit(handleCreateTask)}>
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <TextField
              data-test-id="add-todo-input"
              label={t("addTodoInputPlaceholder")}
              onChange={onChange}
              value={value}
              style={{ width: "50%" }}
              error={!!errors.name?.message}
              helperText={errors.name?.message}
              InputProps={{
                endAdornment: <InputAdornment position="end">↵</InputAdornment>,
              }}
            />
          );
        }}
      />
    </form>
  );
};

export default TodoForm;
