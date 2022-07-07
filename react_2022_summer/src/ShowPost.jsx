import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    LoadingDiv,
    LoadingImg,
    PostReadDiv,
    PostReplDiv,
    PostSection,
    PostTitle,
    PostTitleDiv,
    Repl,
    ReplInput,
    ReplSubmitDiv,
    ReplTitleDiv,
    Replwriter,
    WritereplDiv,
} from "./styledComponent";

const replData = [
    {
        id: 2,
        contents: `내가 생각해도 그건 아니다`,
    },
    {
        id: 5,
        contents: `그럴수도 있나?? 내가 생각해도 그건 아니다`,
    },
];
const countRepls = (repls) => {
    console.log("리뷰 개수를 세는 중...");
    return repls.length;
};

const PostandRepl = React.memo(({ post, postLoading, replLoading, repls, replCount }) => {
    return (
        <PostSection>
            <PostTitleDiv>
                <PostTitle>
                    {/* title */}
                    {post && post.title}
                </PostTitle>
            </PostTitleDiv>

            {postLoading ? (
                <LoadingDiv>
                    <LoadingImg src={`${process.env.PUBLIC_URL}/loading.svg`} />
                </LoadingDiv>
            ) : (
                <PostReadDiv>{post && post.contents} </PostReadDiv>
            )}

            {/* post contents */}

            <ReplTitleDiv>댓글 {replCount}</ReplTitleDiv>
            {replLoading ? (
                <LoadingDiv>
                    <LoadingImg src={`${process.env.PUBLIC_URL}/loading.svg`} />
                </LoadingDiv>
            ) : (
                repls &&
                repls.map((element) => (
                    <PostReplDiv key={element}>
                        <Replwriter>익명</Replwriter>
                        <Repl>{element}</Repl>
                    </PostReplDiv>
                ))
            )}
        </PostSection>
    );
});

const ShowPost = ({ apiUrl }) => {
    const Params = useParams();
    const [post, setPost] = useState(null);
    const [repls, setRepls] = useState([]);
    const [postLoading, setPostLoading] = useState(true);
    const [replLoading, setReplLoading] = useState(true);

    useEffect(() => {
        axios.get(`${apiUrl}posts/${Params.postID}`).then((response) => {
            setPost(response.data);
            setPostLoading(false);
            setRepls(response.data.repls);
            setReplLoading(false);
            replInput.current.focus();
        });
    }, []);

    const [repl, setRepl] = useState("");

    const onChange = (e) => {
        setRepl(e.target.value);
    };

    // for useMemo
    const replCount = useMemo(() => countRepls(repls), [repls]);
    // const replCount = countRepls(repls);

    const replInput = useRef();

    const onSubmitRepl = () => {
        axios
            .post(`${apiUrl}repl/`, {
                contents: repl,
                post: Params.postID,
            })
            .then(() => {
                window.location.reload();
            });
    };

    if (!Params.postID) {
        return <PostSection>잘못된 접근입니다.</PostSection>;
    }
    return (
        <div>
            <PostandRepl
                post={post}
                postLoading={postLoading}
                repls={repls}
                replCount={replCount}
                replLoading={replLoading}
            />
            <WritereplDiv>
                <ReplInput onChange={onChange} value={repl} ref={replInput}></ReplInput>
                <ReplSubmitDiv onClick={onSubmitRepl}>
                    <span>입력</span>
                </ReplSubmitDiv>
            </WritereplDiv>
        </div>
    );
};

export default ShowPost;
