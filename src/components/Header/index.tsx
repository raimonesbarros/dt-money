import logo from "../../assets/logo.svg"
import { Brand, HeaderContainer, HeaderContent, NewTransactionButton } from "./styles"

export function Header(){
  return(
    <HeaderContainer>
      <HeaderContent>
        <Brand>
          <img src={logo} />
          <span>DT Money</span>
        </Brand>
        <NewTransactionButton>
          Nova transação
        </NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  )
}