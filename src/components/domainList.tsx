import { useEffect, useRef, } from 'react'
function DomainList ({ domainSuggestion}: {domainSuggestion: string[] }){
    const listRef = useRef<HTMLUListElement>(null)
    

    useEffect(() => {
        if(listRef.current) {
            listRef.current.classList.add('fade-in');
            
        }
    }, [domainSuggestion])
    //console.log(domainSuggestion) *in case of API error*
    return( 
        <div>
            <ul className="list" ref={listRef}>
                {domainSuggestion.map((domain, index) => (  
                    <li key={index}>
                    <p className="domainCard">
                        {domain}
                        <a href={`https://www.godaddy.com/en-uk/domainsearch/find?domainToCheck=${domain}`} target="_blank">
                        <button className="buyBtn">Buy on GoDaddy.com</button>
                        </a>
                    </p>
                    </li> 
                )
                )}
            </ul>
        </div>
    ) 
}

export default DomainList