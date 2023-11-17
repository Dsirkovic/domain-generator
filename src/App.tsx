import './App.css'
import DomainList from './components/domainList'
import { useState } from 'react'
import axios from 'axios'

function App() {
  const [keywords, setKeywords] = useState("")
  const [domainSuggestion, setDomainSuggestion] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [hideText, setHideText] = useState(false)
  const [itemsRendered, setItemsRendered] = useState(false)

  const handleGenerateDomain = async () => {
    if (!keywords) {
      alert('Please enter some keywords')
      return;
    }
    setLoading(true);

    try {
      const messages = [
        { role: 'user', content: `Generate domain name for ${keywords}` }
      ];

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo", //Model ID
          messages: messages,
          max_tokens: 85,
        },
        {
          headers: {
            Authorization: 'Bearer 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',
          },
        }
      );

      console.log('API Response:', response);

      if (response.data && Array.isArray(response.data.choices) && response.data.choices.length > 0) {
        const suggestions: string = response.data.choices[0].message.content;
        const splitSuggestions = suggestions.split(/\d+\.\s+/).slice(1).map(suggestion => suggestion.trim());
        setDomainSuggestion(splitSuggestions);
        setHideText(true);
        setItemsRendered(true)
      } else {
        console.error('Response data is empty or in an unexpected format:', response.data);
        setHideText(false);
        setItemsRendered(false)
      }
    } catch (error) {
      console.error('Error generating domain suggestions: ', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    {hideText ? null: (
      <h1>Welcome to the domain generator app! If you want to create a domain name, type some keywords related to your website in the bar below. The app will send a request to the Open AI completions API in order to generate some useful domain names.</h1>
    )}
      <input
        type="text"
        placeholder="Desired keywords here"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        className="input"
      />
      <br />
      <button onClick={handleGenerateDomain} disabled={loading} className="button">
        Generate domain name
      </button>
      {loading ? <h1>Loading...</h1> : null}
      <h2>{itemsRendered ? "Hope you enjoy your domain suggestions!" : "Your domain suggestions will appear below"}</h2>
      <DomainList domainSuggestion={domainSuggestion} />
    </>
  )
}

export default App