---
title: "The Tragedy of the Digital Commons: How AI is Killing Open Source"
subtitle: "From spammed bug bounties to code laundering, the rise of machine-generated code is forcing the open-source ecosystem to close its gates."
date: 2026-07-14T08:35:00+03:00
excerpt: "We analyze the negative impacts of generative AI on the open-source ecosystem, detailing spam PRs, bounty abuse, license laundering, and the retreat behind closed gates."
layout: post
image: "/images/cybernetic_autonomy_hero.jpg"
image_alt: "Cybernetic network representation of code repositories and automated inputs"
thumb_image: "/images/cybernetic_autonomy_hero.jpg"
thumb_image_alt: "Cybernetic network representation of code repositories and automated inputs"
categories:
  - Technology
  - Sovereignty
tags:
  - open-source
  - artificial-intelligence
  - licensing
  - developer-tools
syndication:
  - "https://x.com/julz"
---

Open-source software was built on a fragile, human covenant: shared labor, mutual trust, and public credit. For decades, developers spent their evenings fixing bugs, writing documentation, and reviewing code for free. They did it to build a common digital infrastructure that belonged to everyone.

Generative AI is breaking this covenant. By introducing automated scale and extraction into the equation, artificial intelligence is turning the digital commons into a battleground. Maintainers are burning out, repositories are closing their gates, and the open-source ecosystem is retreating behind proprietary walls.

### The Automated Spam Invasion

The most immediate threat is the sheer volume of automated noise. Generative AI allows anyone to generate code, documentation, and security reports with zero effort. 

The security world saw this first. Daniel Stenberg, the creator and maintainer of **cURL** (one of the most widely used libraries on Earth), had to restrict the project's public bug bounty program. The reason was simple: a flood of AI-generated security reports. Automated scanning tools and LLMs spammed the repository with hallucinated vulnerabilities. Stenberg spent hours debunking complex-looking reports that turned out to be completely fabricated by machines. This wasted valuable maintainer time, turning a program meant to secure code into a administrative nightmare.

In addition to bug reports, pull requests (PRs) are being automated. The team behind **Tldraw**, a popular open-source collaborative whiteboard library, took the extreme measure of auto-closing all external public pull requests. Maintainers could no longer keep up with the deluge of low-effort, AI-generated PRs that introduced subtle bugs. To keep the project alive, they had to shut out the community entirely.

Similarly, **Ghost**, the popular open-source publishing platform, implemented a zero-tolerance policy banning AI-generated code submissions. To maintain code quality and verify human authorship, they require contributors to prove they wrote their submissions themselves. 

### License Laundering and the Enclosure of Code

Beyond repository spam, AI giants are extracting value from the open-source commons without returning anything. Generative models are trained on millions of public code repositories. This has led to the rise of **license laundering**.

Historically, copyleft licenses like the GPL guaranteed that if you used open-source code in your project, your project must also be open-source. AI models bypass this covenant. They ingest GPL-licensed code during training and output identical or slightly modified snippets to commercial users, stripping away the copyleft obligations.

This was highlighted in the **Chardet controversy**. Chardet, a widely used Python library, found its codebase scraped and reproduced by commercial AI autocomplete tools without attribution or compliance with its license. AI models act as a laundering mechanism: eating open code and spitting it out under commercial terms, violating the intellectual property of human builders.

In response, developers are writing **non-trainable licenses**. These new legal frameworks include specific "No-AI" clauses, banning models from scraping the repositories for training data. But enforcing these licenses against massive, capitalized AI labs is an uphill battle.

### The Pressure to Close Gates

Faced with automated spam and value extraction, open-source startups are shifting their business models. **Cal.com**, a popular scheduling tool, moved portions of its repository away from pure open-source toward more restrictive commercial licensing. They had to protect their product from being cloned and hosted by large cloud providers who contribute nothing back.

At the same time, venture-backed open-source projects face immense pressure to sell out. **Astral**, the creator of fast Python tools like Ruff and uv, raised millions in venture capital. In a market dominated by AI giants, well-funded startups face buyout pressures. If you cannot beat the infrastructure scale of the tech giants, the logical venture exit is to join them, merging open-source projects into proprietary corporate ecosystems.

At JULZ, we believe that open-source is a sacred stewardship. But to survive the AI invasion, we must change how we build. We must protect our repositories from automated crawlers, support independent maintainers, and write software designed for human networks. The digital commons is under threat, and it is time to build fences around our code.
