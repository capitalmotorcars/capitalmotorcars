export const renderSEOHeading = (text: string | null | undefined) => {
    if (!text) return text;
    if (!text.includes('|')) return text;
    const parts = text.split('|');
    const visible = parts[0];
    const hidden = parts.slice(1).join('|');
    return (
        <>
            {visible.trim()}
            <span className="sr-only"> | {hidden.trim()}</span>
        </>
    );
};
