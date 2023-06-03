import logo from "../../assets/logo.svg";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Brand,
  HeaderContainer,
  HeaderContent,
  NewTransactionButton,
} from "./styles";
import { NewTransactionModal } from "../NewTransactionModal";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Brand>
          <img src={logo} />
          <span>DT Money</span>
        </Brand>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
          
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
