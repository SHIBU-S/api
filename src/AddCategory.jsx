import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { Container,Row,Col } from 'react-bootstrap';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const AddCategory = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <>
        <Container fluid>
            <Row>
                <Col className='border border-dark'>
                    <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={onEditorStateChange}
                    />
                </Col>
            </Row>
        </Container>
    </>
  );
};

export default AddCategory;
