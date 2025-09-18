type FAQ = {
    question: string;
    answer: string;
};

const FAQlist = (FAQ: FAQ) => {
    return (<li>
        <h3 className="text-xl font-semibold">{FAQ.question}</h3>
        <p className="text-md">{FAQ.answer}</p>
    </li>)
}
type FAQSectionProps = {
    arr: FAQ[];
};

const FAQSection = ({ arr }: FAQSectionProps) => {
    console.log(arr);
    return (
        <>
            <h2>Frequently Asked Questions</h2>
            <ul>
                {arr.map((x) => (
                    <FAQlist key={x.question} question={x.question} answer={x.answer} />
                ))}
            </ul>
        </>
    );
};

export default FAQSection;
