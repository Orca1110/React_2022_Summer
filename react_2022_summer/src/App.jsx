import { MediaDiv, Main } from "./styledComponent";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import { useState } from "react";
import Header from "./Header";
import Slogun from "./Slogun";
import ShowPostList from "./ShowPostList";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";
import ShowPost from "./ShowPost";
import WritePost from "./WritePost";

const API_URL = "https://reactapitest.pythonanywhere.com/api/";

function App() {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <>
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                <GlobalStyles />
                <MediaDiv>
                    <Header
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    ></Header>
                    <Main>
                        <Slogun></Slogun>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <ShowPostList
                                        apiUrl={API_URL}
                                    ></ShowPostList>
                                }
                            ></Route>
                            <Route
                                path="/write"
                                element={<WritePost></WritePost>}
                            ></Route>
                            <Route
                                path="/post/:postID"
                                element={<ShowPost></ShowPost>}
                            ></Route>
                        </Routes>
                    </Main>
                    <Footer></Footer>
                </MediaDiv>
            </ThemeProvider>
        </>
    );
}

export default App;
