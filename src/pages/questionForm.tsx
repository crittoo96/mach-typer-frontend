import React from "react";
import Select from "react-select";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
// import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// https://react-hook-form.com/get-started/#IntegratingwithUIlibraries

const requestUrl =
  "https://lmjivvfb66.execute-api.ap-northeast-1.amazonaws.com/Prod/translate";

interface IFormInput {
  questionText: string;
  // lastName: string;
  // iceCreamType: { label: string; value: string };
}

export const QuestionForm = () => {
  const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    if (data.questionText === "") {
      return;
    }
    console.log(data.questionText);
    // 送信ロジック
    const obj = {
      question_text: data.questionText,
    };
    const method = "POST";
    const body = JSON.stringify(obj);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*",
    };
    await fetch(requestUrl, {
      method: method,
      headers: headers,
      body: body,
      mode: "cors",
    })
      .then((response) => response.json())
      .then(console.log)
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="questionText"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="テキストフィールド"
            fullWidth
            margin="normal"
            placeholder="プレースホルダー"
          />
        )}
      />
      {/* <Controller
        name="iceCreamType"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={[
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" },
            ]}
          />
        )}
      /> */}
      {/* <input type="submit" /> */}
      <Button variant="contained" color="primary" type="submit">
        送信
      </Button>
    </form>
  );
};
