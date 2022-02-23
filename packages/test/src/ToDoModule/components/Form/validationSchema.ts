import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
});

export default validationSchema;
