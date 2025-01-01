import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import githubicon from "../assets/github-brands-solid.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type GenerationMode = "paragraphs" | "sentences";

const LoremIpsumGenerator: React.FC = () => {
  const [mode, setMode] = useState<GenerationMode>("paragraphs");
  const [paragraphs, setParagraphs] = useState<number>(1);
  const [sentences, setSentences] = useState<number>(3);
  const [wordsPerSentence, setWordsPerSentence] = useState<number>(10);
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
  const [generatedText, setGeneratedText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const words: string[] = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
    "enim",
    "ad",
    "minim",
    "veniam",
    "quis",
    "nostrud",
    "exercitation",
    "ullamco",
    "laboris",
    "nisi",
    "ut",
    "aliquip",
    "ex",
    "ea",
    "commodo",
    "consequat",
    "duis",
    "aute",
    "irure",
    "dolor",
    "in",
    "reprehenderit",
    "voluptate",
    "velit",
    "esse",
    "cillum",
    "dolore",
    "eu",
    "fugiat",
    "nulla",
    "pariatur",
    "excepteur",
    "sint",
    "occaecat",
    "cupidatat",
    "non",
    "proident",
    "sunt",
    "culpa",
    "qui",
    "officia",
    "deserunt",
    "mollit",
    "anim",
    "id",
    "est",
    "laborum",
  ];

  const generateSentence = (isFirst: boolean = false): string => {
    const sentence: string[] = [];
    for (let i = 0; i < wordsPerSentence; i++) {
      if (isFirst && i === 0 && startWithLorem) {
        sentence.push("Lorem");
        sentence.push("ipsum");
        i++;
      } else {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        sentence.push(randomWord);
      }
    }
    sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
    return sentence.join(" ") + ".";
  };

  const generateText = (): void => {
    const result: string[] = [];

    if (mode === "paragraphs") {
      for (let i = 0; i < paragraphs; i++) {
        const paragraph: string[] = [];
        for (let j = 0; j < sentences; j++) {
          paragraph.push(generateSentence(i === 0 && j === 0));
        }
        result.push(paragraph.join(" "));
      }
    } else {
      for (let i = 0; i < sentences; i++) {
        result.push(generateSentence(i === 0));
      }
    }

    setGeneratedText(
      mode === "paragraphs" ? result.join("\n\n") : result.join(" ")
    );
  };

  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(generatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleParagraphsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setParagraphs(isNaN(value) ? 1 : value);
  };

  const handleSentencesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSentences(isNaN(value) ? 1 : value);
  };

  const handleWordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setWordsPerSentence(isNaN(value) ? 5 : value);
  };

  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader>
        <CardTitle>Lorem Ipsum Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mode">Generation Mode</Label>
            <Select
              value={mode}
              onValueChange={(value: GenerationMode) => setMode(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paragraphs">Paragraphs</SelectItem>
                <SelectItem value="sentences">Sentences</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {mode === "paragraphs" && (
              <div className="space-y-2">
                <Label htmlFor="paragraphs">Number of Paragraphs</Label>
                <Input
                  id="paragraphs"
                  type="number"
                  min="1"
                  max="10"
                  value={paragraphs}
                  onChange={handleParagraphsChange}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="sentences">
                {mode === "paragraphs"
                  ? "Sentences per Paragraph"
                  : "Number of Sentences"}
              </Label>
              <Input
                id="sentences"
                type="number"
                min="1"
                max={mode === "paragraphs" ? 10 : 20}
                value={sentences}
                onChange={handleSentencesChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="words">Words per Sentence</Label>
              <Input
                id="words"
                type="number"
                min="5"
                max="20"
                value={wordsPerSentence}
                onChange={handleWordsChange}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="lorem-start"
              checked={startWithLorem}
              onCheckedChange={setStartWithLorem}
              className="bg-white"
            />
            <Label htmlFor="lorem-start">
              Start with &quot;Lorem ipsum&quot;
            </Label>
          </div>

          <Button className="w-full" onClick={generateText}>
            Generate Text
          </Button>

          {generatedText && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Text
                    </>
                  )}
                </Button>
              </div>
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="whitespace-pre-wrap">{generatedText}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <div className="flex flex-col justify-center items-center my-10">
        <a
          href="https://github.com/jitendraSingh23"
          target="_blank"
          className="text-black border-2 border-black bg-[#ffffff] hover:bg-slate-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
        >
          <img src={githubicon} alt="git" className="h-5 w-5 mr-2" />
          More Projects
        </a>
      </div>
    </Card>
  );
};

export default LoremIpsumGenerator;
