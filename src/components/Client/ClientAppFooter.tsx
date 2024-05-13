import styled from "styled-components";
import { useAppSelector } from "../../hooks/ReduxHook";
import { IThemeReducer } from "../../store/reducer/themeReducer";

export default function ClientAppFooter() {
    const { isDarkTheme }: { isDarkTheme: boolean } = useAppSelector(
        (state: IThemeReducer) => state.themeReducer
    );
    const StyledFooter = styled.footer`
    display: flex;
    z-index: 5;
    position: relative;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dddddd;
    background-color: ${() => (isDarkTheme ? "#173EAD" : "#1D4ED8")};
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    padding: 1rem 0;
  `;
    return <StyledFooter className="flex justify-content-center   align-items-center">
        <span className="mr-2 text-white">  Make by</span>

        <a href="https://github.com/AnhTranThe/">
            <span className="mr-2 text-orange-600">The Anh</span>
            <i className="pi pi-heart-fill" style={{ color: 'red' }}></i>
        </a>
    </StyledFooter>;
}
