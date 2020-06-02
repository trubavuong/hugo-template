---
draft: false
date: {{ .Date }}
title: "{{ replace (replaceRE "^\\d{6}-" "" .Name) "-" " " | title }}"
slug: "{{ replaceRE "^\\d{6}-" "" .Name }}"
summary:
tags:
  -
---

**Intro.**

{{< toc >}}

**Body.**
