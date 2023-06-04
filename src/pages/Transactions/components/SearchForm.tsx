import { MagnifyingGlass } from "@phosphor-icons/react";
import { SearchFormContainer } from "./SearchForm.style";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../../contexts/TransactionsContext";

const SearchFormSchema = z.object({
  query: z.string().min(1),
});

type SearchFormInput = z.infer<typeof SearchFormSchema>;

export function SearchForm() {
  const { fetchLoadTransactions } = useContext(TransactionsContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SearchFormInput>({
    resolver: zodResolver(SearchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInput) {
    await fetchLoadTransactions(data.query)
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
