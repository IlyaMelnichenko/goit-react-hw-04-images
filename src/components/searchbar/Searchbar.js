import { StyledButton, StyledForm, StyledHeader, StyledInput } from "./StyledSearchbar";
import { BiSearchAlt } from 'react-icons/bi';
export const Searchbar = ({changeQuery}) => {
  return (
    <StyledHeader >
      <StyledForm className="form" onSubmit={evt=>{
        evt.preventDefault();
        changeQuery(evt.target.elements.query.value)
      }}>
        <StyledButton type="submit" className="button">
          <span ><BiSearchAlt size={25} /></span>
        </StyledButton>

        <StyledInput
        name='query'
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </StyledForm>
    </StyledHeader>
  );
};
