interface TableComponentTypes {
  params: {
    headers: Record<string, string>;
    data: Record<string, number | string | React.ReactNode>[];
    title?: string;
    containerClassNames?: string;
    titleClassNames?: string;
    tipo?: FormSchema;
  };
}

type FormField = {
  type: "input" | "select" | "checkbox" | "date" | "dateRange";
  options?: string[];
};

type FormSchema = Record<
  string,
  {
    type: "input" | "select" | "checkbox" | "date" | "dateRange";
    options?: string[];
  }
>[];
