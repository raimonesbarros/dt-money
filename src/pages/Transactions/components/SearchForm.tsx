import { MagnifyingGlass } from "@phosphor-icons/react";
import { SearchFormContainer } from "./SearchForm.style";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SearchFormSchema = z.object({
  query: z.string().min(1),
});

type SearchFormInput = z.infer<typeof SearchFormSchema>;

export function SearchForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SearchFormInput>({
    resolver: zodResolver(SearchFormSchema),
  });

  function handleSearchTransactions(data: SearchFormInput) {
    console.log(data);
    reset();
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query", { required: true })}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
