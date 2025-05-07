import { Card, Tag, Avatar, Typography, Tooltip } from "antd";
import {
  ClockCircleOutlined,
  GlobalOutlined,
  EyeOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";

import styles from "./NewsSnippet.module.scss";

export interface IData_TagItem {
  value: string;
  count: number;
}

export interface IData_TrafficItem {
  value: string;
  count: number;
}

export interface IData_SnippetNews {
  ID: number;
  TI: string;
  AB: string;
  URL: string;
  DOM: string;
  DP: string;
  LANG: string;
  REACH: number;
  KW: IData_TagItem[];
  AU: string[];
  CNTR: string;
  CNTR_CODE: string;
  SENT: "positive" | "neutral" | "negative";
  TRAFFIC: IData_TrafficItem[];
  FAV: string;
  HIGHLIGHTS: string[];
}

const { Title, Paragraph, Text } = Typography;

interface Props {
  data: IData_SnippetNews;
}

const sentimentIcon = (sent: IData_SnippetNews["SENT"]) => {
  switch (sent) {
    case "positive":
      return <LikeOutlined style={{ color: "green" }} />;
    case "negative":
      return <DislikeOutlined style={{ color: "red" }} />;
    default:
      return <LikeOutlined />;
  }
};

export const NewsSnippet = ({ data }: Props) => {
  const date = new Date(data.DP);
  return (
    <Card
      className={styles.news}
      hoverable
      cover={
        <Avatar
          src={`https://${data.DOM}${data.FAV}`}
          size={48}
          className={styles.avatar}
        />
      }
      onClick={(e) => {
        if ((e.target as HTMLElement).closest(".ant-typography-expand")) {
          return;
        }
        window.open(data.URL, "_blank");
      }}
    >
      <div className={styles.header}>
        <GlobalOutlined />
        <Text type="secondary" className={styles.domain}>
          {data.DOM}
        </Text>

        <ClockCircleOutlined />
        <Text type="secondary">{date.toLocaleString()}</Text>
      </div>

      <Title level={4} className={styles.title}>
        {data.TI}
      </Title>

      <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "more" }}>
        {data.AB}
      </Paragraph>

      <div className={styles.metrics}>
        <Tooltip title="Reach">
          <EyeOutlined />
        </Tooltip>

        <Text>{data.REACH}</Text>
        <Tooltip title="Sentiment">{sentimentIcon(data.SENT)}</Tooltip>
      </div>

      <div className={styles.tags}>
        {data.KW.map((tag) => (
          <Tag key={tag.value}>
            {tag.value} ({tag.count})
          </Tag>
        ))}
      </div>

      <div className={styles.traffic}>
        {data.TRAFFIC.map((item) => (
          <Tooltip key={item.value} title={`${(item.count * 100).toFixed(1)}%`}>
            <Tag>{item.value}</Tag>
          </Tooltip>
        ))}
      </div>

      {data.HIGHLIGHTS.length > 0 && (
        <div className={styles.highlights}>
          <Title level={5} className={styles.highlights__title}>
            Highlights
          </Title>

          {data.HIGHLIGHTS.map((h, i) => (
            <Paragraph key={i} className={styles.highlight}>
              <span dangerouslySetInnerHTML={{ __html: h }} />
            </Paragraph>
          ))}
        </div>
      )}
    </Card>
  );
};

export default NewsSnippet;
