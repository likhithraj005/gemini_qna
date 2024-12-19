const ChatResponse = ({ response }) => {
    if (!response) return null;

    const { candidates, usageMetadata } = response;

    return (
        <div>
            <h3>Response</h3>
            {candidates.map((candidate, index) => (
                <div className="card mb-3" key={index}>
                    <div className="card-body">
                        <h5 className="card-title">Candidate {index + 1}</h5>
                        <p className="card-text">{candidate.content.parts[0]?.text || 'No content available.'}</p>
                        {candidate?.citationMetadata?.citationSources?.length > 0 && (
                            <>
                                <h6>Citations:</h6>
                                <ul>
                                    {candidate.citationMetadata.citationSources.map((source, idx) => (
                                        <li key={idx}>
                                            <a href={source.url} target="_blank" rel="noopener noreferrer">
                                                {source.url}
                                            </a>{' '}
                                            (Indexes: {source.startIndex} - {source.endIndex})
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            ))}

            {usageMetadata && (
                <div>
                    <h4>Usage Metadata</h4>
                    <p>Prompt Tokens: {usageMetadata.promptTokenCount}</p>
                    <p>Response Tokens: {usageMetadata.candidatesTokenCount}</p>
                    <p>Total Tokens: {usageMetadata.totalTokenCount}</p>
                </div>
            )}
        </div>
    );
};

export default ChatResponse;


