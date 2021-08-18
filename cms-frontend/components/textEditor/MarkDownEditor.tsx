import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/dist/markdown-editor.css';
import '@uiw/react-markdown-preview/dist/markdown.css';
import { UseFormRegister } from 'react-hook-form';

interface MarkDownEditorProps {
  defaultValue?: string;
  name: string;
  register: UseFormRegister<any>;
  validations: any;
  setValue: any;
  error: any;
}

const MarkDownEditor = ({
  name,
  register,
  validations,
  setValue,
  error,
  defaultValue = '',
}: MarkDownEditorProps) => {
  const [text, setText] = React.useState<string | undefined>(defaultValue);

  const onChange: any = (value: string) => {
    setText(value);
    setValue(name, value);
  };

  return (
    <div className="mt-4 mx-4">
      <p>Cuerpo de la noticia:</p>
      <MDEditor value={text} onChange={onChange} />
      <input className="hidden" {...register(name, validations)} />
      <p className="text-red-500 text-xs">{error && error.message}</p>
    </div>
  );
};

export default MarkDownEditor;
