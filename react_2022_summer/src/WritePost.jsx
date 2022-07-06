import React, { useState } from "react";
import {
    ContentsInput,
    PostSection,
    PostSubmit,
    PostSubmitDiv,
    PostTitle,
    PostTitleDiv,
    PostWriteDiv,
    TitleInput,
} from "./styledComponent";
import WriteTitle from "./WriteTitle";
import InputPost from "./InputPost";

const SubmitComponent = React.memo(() => (
    <PostSubmitDiv>
        <PostSubmit>작성완료</PostSubmit>
    </PostSubmitDiv>
));

function WritePost(props) {
    const [inputs, setInputs] = useState({
        title: "",
        contents: "",
    });
    const { title, contents } = inputs;
    const onChange = (e) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
            ...inputs, // 기존의 input 객체를 복사한 뒤
            [name]: value, // name 키를 가진 값을 value 로 설정
        });
    };

    return (
        <PostSection>
            <WriteTitle />
            <PostWriteDiv>
                <InputPost
                    onChange={onChange}
                    title={title}
                    contents={contents}
                ></InputPost>
            </PostWriteDiv>
            <SubmitComponent />
        </PostSection>
    );
}

export default WritePost;
