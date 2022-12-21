import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { BsLightningChargeFill } from 'react-icons/bs';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Home() {
    const [questionInput, setQuestionInput] = useState("");
    const [result, setResult] = useState();
    const [active, setActive] = useState(false);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    async function onSubmit(event) {
        event.preventDefault();
        setCopied(false);
        setLoading(true);
        setResult("");
        const response = await fetch("/api/support", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: questionInput }),
        });
        const data = await response.json();
        setLoading(false);
        setResult(data.result);
        setQuestionInput("");
    }

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>OpenAI Quickstart</title>
            </Head>

            <main className={styles.main}>
                {active &&
                    <div className={styles.support}>
                        <h3>Support for Support</h3>
                        <form onSubmit={onSubmit}>
                            <textarea
                                type="text"
                                name="question"
                                placeholder="Ask me anything"
                                value={questionInput}
                                onChange={(e) => setQuestionInput(e.target.value)}
                                rows="5"
                                cols="60"
                                className={styles.question}
                            ></textarea>

                            <input type="submit" value="Submit Question" />
                        </form>
                        {loading && <span className={styles.loader}></span>}
                        {result &&
                            <>
                                <div className={styles.result}>
                                    <h4>Possible answer:</h4>
                                    <p>{result}</p>
                                    <div className={styles.copy}>
                                        <CopyToClipboard
                                            text={result.trim()}
                                            onCopy={() => setCopied(true)}>
                                            <span>Copy to clipboard</span>
                                        </CopyToClipboard>
                                    </div>
                                    {copied && <span>To the forum!</span>}
                                </div>
                            </>
                        }
                    </div>}

                <div className={styles.launcher} onClick={() => setActive(!active)} >
                    <BsLightningChargeFill className={styles.lightning} />
                </div>
            </main>
        </div>
    );
}

