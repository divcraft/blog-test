import React, { useEffect, useState } from 'react';

export default function App() {
  const [api, setApi] = useState('');
  const [formContent, setFormContent] = useState('');
  const [test, setTest] = useState('');
  const [dataUpdateFlague, setDataUpdateFlague] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormContent(value);
  };
  const handleSubmit = (e) => {
    if (!formContent) return;
    e.preventDefault();
    fetch('http://localhost:5000/api/add-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formContent }),
    });
    setFormContent('');
    setDataUpdateFlague(!dataUpdateFlague);
  };

  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then((response) => response.json())
      .then(({ message }) => setApi(message))
      // eslint-disable-next-line no-console
      .catch((err) => console.log('err:', err));
  }, []);
  useEffect(() => {
    fetch('http://localhost:5000/api/show-test')
      .then((response) => response.json())
      .then((data) => setTest(data));
  }, [dataUpdateFlague]);
  return (
    <>
      <h1>Hello world!</h1>
      <div>{api}</div>
      <form action="get">
        <input type="text" value={formContent} onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>Wyślij</button>
      </form>
      <ul>
        {test && test.map(({ _id, content }) => <li key={_id}>{content}</li>)}
      </ul>
    </>
  );
}
