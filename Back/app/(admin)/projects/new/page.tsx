import NewProjectClientForm from "./new-project-client-form";
import { getCategories } from "@/app/actions/category";

export default async function NewProjectPage() {
  const categories = await getCategories();

  return <NewProjectClientForm categories={categories} />;
}
