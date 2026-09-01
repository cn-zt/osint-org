---
title: 开源情报入门：从公开渠道到可用情报
excerpt: 梳理 OSINT 的核心方法论——规划、采集、处理、分析与传播，并给出可落地的工具清单。
author: 社区管理组 --「celestial-sky」
date: "2026-08-21 09:30"
---

# 开源情报入门

OSINT（Open Source Intelligence）指从**公开可访问**的渠道收集、整理并分析出可用情报。本文给出一套可复用的方法论。

## 五步流程

1. 规划：明确情报需求与边界
2. 采集：从公开源获取原始数据
3. 处理：清洗、去重、结构化
4. 分析：关联、交叉验证
5. 传播：形成可决策的产出

## 工具对照表

| 阶段 | 推荐工具 | 说明 |
| :--- | :--- | :--- |
| 采集 | `theHarvester` | 邮箱与子域侦察 |
| 关联 | **Maltego** | 实体关系图谱 |
| 资产 | Shodan | 暴露设备指纹 |

## 快速上手：theHarvester

```bash
# 从公开源采集目标域名的相关邮箱与子域
theHarvester -d example.com -b google,bing -l 50
```

处理结果的简单脚本：

```python
import json

def rank(records):
    """按置信度排序输出"""
    return sorted(records, key=lambda r: r.get('score', 0), reverse=True)

data = json.load(open('result.json'))
for item in rank(data)[:10]:
    print(item['value'])
```

## 实战检查清单

- [x] 已明确采集的法律边界
- [x] 使用可信的公开数据源
- [ ] 完成交叉验证再下结论
- [ ] 记录溯源链路以备复核

## 注意事项

切勿触碰非公开数据，~~使用未授权的入侵手段~~ 属于违规操作。更多讨论见 https://pd.qq.com/s/hol0bgn98?b=9

> 情报的价值不在于收集了多少，而在于能否支撑决策。
