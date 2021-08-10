import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/dist/markdown-editor.css';
import '@uiw/react-markdown-preview/dist/markdown.css';

const MarkDownEditor = () => {
  const [value, setValue] = React.useState<string | undefined>(
    '**Hello world!!!**',
  );

  return (
    <div className="mt-4 mx-4">
      <p>Cuerpo de la noticia:</p>
      <MDEditor value={value} onChange={setValue} />
    </div>
  );
};

export default MarkDownEditor;
