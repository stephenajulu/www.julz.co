---
title: Join the Guild
subtitle: "The Alliance: Step into the Crucible of Co-Creation"
layout: advanced
hide_title: true
sections:
  - type: hero_section
    section_id: join-hero
    title: Join the Guild
    class: hero-full-center
    content: |
      <div class="tagline">The JULZ Alliance</div>
      Step into the crucible of co-creation. We are gathering a network of builders, engineers, and designers to forge civilization-grade systems.
  - type: form_section
    section_id: join-form
    title: Alignment Application
    subtitle: Join the sovereign network
    content: |
      Are you a software engineer specializing in local-first code, a hardware builder crafting offline devices, a biophilic designer researching tropical brutalism, or a storyteller charting narrative arcs that echo?
      
      JULZ is a personal forge, but it gathers a guild of aligned minds. If you want to collaborate on independent projects, pitch ventures, or co-create under our covenant, complete the form on the right.
      
      We review applications based on alignment, technical competence, and commitment to longevity.
    form_id: joinForm
    form_action: /thank-you/
    submit_label: Submit Alignment Application
    form_fields:
      - input_type: text
        name: name
        label: Name
        default_value: Your name
        is_required: true
      - input_type: email
        name: email
        label: Email
        default_value: Your email address
        is_required: true
      - input_type: select
        name: expertise
        label: Area of Expertise
        default_value: Select your primary craft
        options:
          - Software Engineering
          - Hardware & Robotics
          - Solarpunk & Bio-design
          - Storytelling & Creative Design
          - Venture Builder
          - Other
      - input_type: textarea
        name: reason
        label: Why do you want to join JULZ? What do you want to build?
        default_value: Tell us about your journey, your expertise, and how you align with our ethos...
        is_required: true
      - input_type: text
        name: portfolio
        label: Portfolio, GitHub, or Website Link
        default_value: https://github.com/yourusername
        is_required: false
      - input_type: checkbox
        name: consent
        label: I align with the JULZ Ethos and understand my submission is stored for review.
        is_required: true
  - type: content_section
    content: |
      <div class="container container--md" style="margin-top: 2em; padding-top: 2em; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">
        <p class="formula-text">Explore the other dimensions of our covenant:</p>
        <div class="button-group" style="justify-content: center; margin-top: 1.5em;">
          <a href="/purpose/" class="button button--secondary">Our Purpose</a>
          <a href="/ethos/" class="button button--secondary">Our Ethos</a>
          <a href="/about/" class="button button--secondary">Our Story</a>
        </div>
      </div>
seo:
  title: Join the Guild | JULZ Sovereign Network
  description: Apply to join the JULZ guild network of builders, engineers, and designers co-creating local-first, biophilic systems.
---
