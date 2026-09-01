---
title: Shodan 实战：定位暴露在公网的资产
excerpt: 通过过滤器语法与实战案例，教你用 Shodan 快速绘制目标攻击面。
author: 社区管理组 --「celestial-sky」
date: "2026-08-18 20:15"
---

# Shodan 实战指南

Shodan 是面向**物联网与暴露资产**的搜索引擎，本篇聚焦过滤器语法。

## 常用过滤器

| 过滤器 | 作用 |
| :--- | :--- |
| `country:` | 按国家代码筛选 |
| `port:` | 指定端口 |
| `product:` | 指定产品/服务 |

## 示例

```bash
country:CN port:8080 product:"nginx"
```

- [x] 确定目标网段
- [ ] 导出结果做进一步关联

> 仅用于授权范围内的资产梳理。
