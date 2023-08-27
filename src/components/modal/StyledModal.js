import styled from 'styled-components'

export const StyledModalImg = styled.img`
width:100%;
height: 100%;
object-fit: cover;
display: ${props => (props.$isLoadingImage ? 'none' : 'block')};

      
`

