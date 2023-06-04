import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "@phosphor-icons/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";

const NewTransactionFormSchema = z.object({
  description: z.string().min(1),
  price: z.number().min(1),
  category: z.string().min(1),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionFormInput = z.infer<typeof NewTransactionFormSchema>;

export function NewTransactionModal() {
  const { createNewTransaction } = useContext(TransactionsContext)
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInput>({
    resolver: zodResolver(NewTransactionFormSchema),
  });

  function handleCreateNewTransaction(data: NewTransactionFormInput) {
    const { description, price, category, type } = data;

    createNewTransaction({
      description,
      price,
      category,
      type,
    })

    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            autoFocus
            type="text"
            placeholder="Descrição"
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Valor"
            {...register("price", { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            {...register("category")}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleDown size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleUp size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
