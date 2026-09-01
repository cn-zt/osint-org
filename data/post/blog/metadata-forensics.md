---
title: 元数据取证：从一张图片读出隐藏信息
excerpt: ExifTool 与 Wayback Machine 组合，挖掘文件与网页背后的元数据线索。
author: 社区管理组 --「celestial-sky」
date: "2026-08-12 14:45"
---

# 元数据取证

文件与网页往往携带**未被察觉的元数据**，是 OSINT 的金矿。

## 工具

| 工具 | 用途 |
| :--- | :--- |
| ExifTool | 解析图片/文档元数据 |
| Wayback | 回溯网页历史版本 |

- [x] 提取原始文件元数据
- [x] 比对历史快照差异
- [ ] 形成时间线

参考项目主页 https://example.org/osint

> 元数据会泄露拍摄时间、设备与地理位置。
