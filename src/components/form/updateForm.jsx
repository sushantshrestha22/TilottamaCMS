import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { Textarea } from "../ui/textarea";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";

export function UpdateForm({
  fields,
  defaultValue,
  onSubmit,
  validationSchema,
  title1,
  title2,
  titleLink1,
  titleLink2,
}) {
  // ...
  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValue,
  });

  const fileInputRefs = useRef({});
  const [filePreviews, setFilePreviews] = useState({});

  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    form.setValue(name, file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreviews((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileDelete = (name) => {
    form.setValue(name, "");
    if (fileInputRefs.current[name]) {
      fileInputRefs.current[name].value = "";
    }
    setFilePreviews((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (data) => {
    onSubmit(data);
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={titleLink1}>{title1}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={titleLink2}>Update</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mb-4">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">
          Update {title1}
        </h3>
        <p className="text-md text-gray-600">
          Update the details of the {title1.toLowerCase()} below.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          {fields.map((item) => (
            <FormField
              control={form.control}
              name={item.name}
              key={item.name}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{item.label}</FormLabel>
                  <FormControl>
                    {item.type === "select" ? (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>{item.name}</SelectLabel>
                            {item.options.map((option) => (
                              <SelectItem
                                value={option.value}
                                key={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    ) : item.type === "jodit" ? (
                      <JoditEditor
                        value={field.value}
                        config={{
                          readonly: false,
                          toolbar: true,
                          height: 300,
                          buttons:
                            "bold,strikethrough,underline,italic,|,ul,ol,|,indent,|,font,fontsize,brush,paragraph,|,image,video,table,link,|,paste,pastetext,pasteword,|,hr,symbol,fullsize,print",
                        }}
                        placeholder={field.placeholder || ""}
                        tabIndex={1}
                        onBlur={(newContent) => field.onChange(newContent)}
                      />
                    ) : item.type === "textarea" ? (
                      <Textarea
                        placeholder={item.label}
                        value={field.value}
                        {...field}
                      />
                    ) : item.type === "file" ? (
                      <div>
                        {field.value ? (
                          <div>
                            {item.accept === "pdf/*" ? (
                              <Link to={field.value} target="_blank">
                                <FaFilePdf className="text-destructive h-10 w-10" />
                                {field.value}
                              </Link>
                            ) : (
                              <img
                                src={filePreviews[item.name] || field.value}
                                alt={item.label}
                                className="h-40 w-40 "
                              />
                            )}
                            <Button
                              variant="destructive"
                              onClick={() => handleFileDelete(item.name)}
                            >
                              <Trash />
                            </Button>
                          </div>
                        ) : (
                          <Input
                            type="file"
                            accept={item.accept || "image/*"}
                            name={item.name}
                            ref={(el) =>
                              (fileInputRefs.current[item.name] = el)
                            }
                            onChange={(e) => handleFileChange(e, item.name)}
                          />
                        )}
                      </div>
                    ) : (
                      <Input
                        type={item.type}
                        placeholder={item.label}
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage>
                    {fieldState.error ? fieldState.error.message : null}
                  </FormMessage>
                </FormItem>
              )}
            />
          ))}
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
