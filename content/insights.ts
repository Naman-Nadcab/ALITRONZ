import { extraArticles } from "@/content/insights-extra";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  blocks: ArticleBlock[];
  related: string[];
  services?: { href: string; label: string }[];
};

const coreArticles: Article[] = [
  {
    slug: "scope-an-enterprise-assistant",
    title: "Scope an enterprise assistant before you pick a model",
    excerpt:
      "The model is the replaceable part. The scope is the decision about what the assistant may read, what it may draft, and what a person must still confirm.",
    date: "2026-10-16",
    category: "AI and Automation",
    related: ["trading-software-is-a-system", "blockchain-products-that-can-change"],
    blocks: [
      {
        type: "p",
        text: "Most assistant projects start with a demonstration. Someone pastes a policy into a chat window and the answer looks fluent. The production question is different: which document is current, who is allowed to see it, and what happens when the answer is wrong.",
      },
      {
        type: "p",
        text: "Alitroz treats that question as the scope. The model can be changed later. The boundary between reading, drafting, and acting is expensive to change once people rely on it.",
      },
      {
        type: "h2",
        text: "Start from the decision",
      },
      {
        type: "p",
        text: "Name the job. A useful scope sounds like this: help a support lead answer a procedure question from the approved runbooks, and refuse when the runbook does not contain the answer. A weak scope sounds like this: add AI to the company.",
      },
      {
        type: "p",
        text: "Write down the cost of a wrong answer. If the cost is a few minutes of confusion, a citation and a correction path may be enough. If the cost is a payment, a customer record, or a trade, the assistant should prepare the action and a person should confirm it. Autonomy is a decision you can defend, not a setting you leave on because the demo was impressive.",
      },
      {
        type: "h2",
        text: "Separate retrieval from action",
      },
      {
        type: "p",
        text: "Retrieval-augmented generation is a way to answer from a corpus. It is not a permission system. If the index contains a document the user cannot open in the source system, the assistant has created a new leak. Permissions have to travel with the chunk, or the corpus has to be built per audience.",
      },
      {
        type: "p",
        text: "Actions belong in a second design. List the tools the assistant may call. For each one, say whether it reads or writes, and who confirms a write. An allow-list is dull. It is also the difference between a copilot and an unattended integration.",
      },
      {
        type: "h2",
        text: "Build the evaluation set before the launch review",
      },
      {
        type: "p",
        text: "Collect questions the team already asks. Attach the answer you would accept, and the source it should cite. Include cases where the right behaviour is to refuse. Run that set before you argue about prompts. Keep it afterwards, because a model or a corpus change will move the results.",
      },
      {
        type: "ul",
        items: [
          "Questions with a known source in the corpus.",
          "Questions the corpus cannot answer.",
          "Questions the user is not allowed to ask of that source.",
          "Write actions that must stop at a human confirmation.",
        ],
      },
      {
        type: "h2",
        text: "Choose the host for the data, not for the headline",
      },
      {
        type: "p",
        text: "Where the prompt is processed, how long it is retained, and whether it is used to train a model are commercial and technical constraints. They belong in the scope. A provider adapter keeps that choice reversible. Baking a single vendor into the product makes the next security review harder than it needs to be.",
      },
      {
        type: "h2",
        text: "What not to automate first",
      },
      {
        type: "p",
        text: "Do not start with the workflow that has no owner, no source of truth, and a high cost of error. Start with a corpus someone will maintain, a user who can tell a bad answer from a good one, and a log that shows the sources. Widen the scope when the evaluation set says the narrow version holds.",
      },
      {
        type: "p",
        text: "That is slower than a pilot with no boundary. It is also the version a business can keep.",
      },
    ],
  },
  {
    slug: "trading-software-is-a-system",
    title: "Trading software is a system, not a screen",
    excerpt:
      "A terminal is the visible part. The work is market data, order state, vendor access, reconciliation, and a clear line between the software firm and the broker.",
    date: "2026-10-16",
    category: "Financial and Trading Technology",
    related: ["scope-an-enterprise-assistant", "blockchain-products-that-can-change"],
    blocks: [
      {
        type: "p",
        text: "Trading businesses often ask for a better screen. The screen matters. It is not the system. A workstation that cannot say whether a price is live, delayed, or simulated, or whether an order was accepted, is a picture of a trading stack rather than part of one.",
      },
      {
        type: "h2",
        text: "The pieces are different problems",
      },
      {
        type: "p",
        text: "Charting, market data, order entry, risk display, and back-office reconciliation do not fail in the same way. A chart can be slightly late and still be useful. An order ticket cannot guess. A risk number that does not match the blotter will be ignored by the desk within a week.",
      },
      {
        type: "ul",
        items: [
          "Market data depends on a licence and a feed the client is allowed to use.",
          "Order entry depends on a venue, a liquidity provider, or a platform the client has access to.",
          "Positions and breaks depend on storing what was sent and what came back.",
          "The back office depends on those records being complete enough to reconcile.",
        ],
      },
      {
        type: "h2",
        text: "Vendor access is a precondition",
      },
      {
        type: "p",
        text: "MetaTrader 4, MetaTrader 5, a liquidity provider, or a market-data vendor will not become available because a software project needs them. The client holds the account, the contract, and the permission. A technology partner integrates what those relationships allow and does not bypass the vendor's controls.",
      },
      {
        type: "p",
        text: "If the access is not ready, the honest engineering plan says so. Building the interface against a fictional production route wastes the part of the budget that should have gone on the adapter you can actually ship.",
      },
      {
        type: "h2",
        text: "Demonstration is not production",
      },
      {
        type: "p",
        text: "Simulated liquidity and delayed feeds are legitimate development tools. They become a problem when the interface, the sales conversation, or the status report calls them live execution. Label the mode in the product. Keep demonstration and production configuration apart. Refuse to demonstrate a live order path you do not have.",
      },
      {
        type: "h2",
        text: "The developer is not the broker",
      },
      {
        type: "p",
        text: "A firm can commission a terminal, a CRM, or an order-management service without transferring the regulated activity to the company that writes the code. The software should make that obvious. Credentials, client money, custody, and investment decisions stay with the firm that owns them. The engineering engagement should say the same thing in the contract, not only on a website.",
      },
      {
        type: "h2",
        text: "Questions worth asking a technology partner",
      },
      {
        type: "ul",
        items: [
          "Which vendor access do you need from us before the integration can be real?",
          "How will a user know that a price or an execution path is simulated?",
          "Where is the record of an order request and the response?",
          "What will you not operate on our behalf?",
          "How do you test a reject, a disconnect, and a break, not only a happy fill?",
        ],
      },
      {
        type: "p",
        text: "The useful answers are specific. They name the systems, the environments, and the limits. A partner that talks only about the look of the terminal has not started the job.",
      },
    ],
  },
  {
    slug: "blockchain-products-that-can-change",
    title: "Design blockchain products that can still be changed",
    excerpt:
      "Immutability is a property of some state, not an excuse to skip upgrades, indexing, wallet failure, and the question of who holds the admin key.",
    date: "2026-10-16",
    category: "Web3 and Blockchain",
    related: ["scope-an-enterprise-assistant", "trading-software-is-a-system"],
    blocks: [
      {
        type: "p",
        text: "A blockchain product is sold as permanent and then operated as a service. Contracts are upgraded. Indexers fall behind. Wallets reject a transaction. Someone still has a key that can change the rules. The engineering job is to make those facts visible, not to pretend the chain removed them.",
      },
      {
        type: "h2",
        text: "Put less on the chain than the pitch suggests",
      },
      {
        type: "p",
        text: "Put on the chain the state that must be enforced without trusting your server: balances, entitlements, or the rules the product claims are public. Leave preferences, search, and operational notes in an ordinary application. An indexer can show chain data quickly. It should not become a second balance that the interface trusts more than the contract.",
      },
      {
        type: "h2",
        text: "Name the admin key",
      },
      {
        type: "p",
        text: "If a contract can be paused or upgraded, write down who can do it and how a person reviews that action. If nothing can be upgraded, write down how you will ship a new version and move users. Both designs are legitimate. An unnamed design is how teams discover their operational model during an incident.",
      },
      {
        type: "p",
        text: "Keys do not belong on the application server as a convenience. A console can prepare a transaction. The client, or the user's wallet, signs it. That split is also what keeps a software company from quietly becoming a custodian.",
      },
      {
        type: "h2",
        text: "Show the lag",
      },
      {
        type: "p",
        text: "Indexing and node APIs fail and they delay. The interface should say when its picture is behind the chain. A stale balance presented as current is a product defect, even when the contract is fine.",
      },
      {
        type: "h2",
        text: "Rehearse the wallet, not only the contract",
      },
      {
        type: "p",
        text: "Users fail at the signature step: the wrong network, a rejected prompt, a parameter they cannot read. Show the contract, the function, and the arguments before the wallet opens. Log the preparation even if the signature never arrives, so support can see the difference between a product bug and a user who declined.",
      },
      {
        type: "h2",
        text: "Testing is not an audit",
      },
      {
        type: "p",
        text: "Development tests should cover the behaviour, the admin paths, and the nasty inputs. They do not prove the absence of a defect, and they do not replace an independent review when the value at risk deserves one. A software partner can prepare for that review and can fix findings it is authorized to fix. It should not describe its own test suite as a guarantee.",
      },
      {
        type: "p",
        text: "The same restraint applies to the business around the code. Building exchange software, tokenization tools, or a DeFi application does not make the engineering firm an exchange, an issuer, or an adviser. Say which party operates the product. Then design the software so that statement remains true.",
      },
    ],
  },
];

export const articles: Article[] = [...coreArticles, ...extraArticles];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
