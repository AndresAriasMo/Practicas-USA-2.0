interface NotificationEmailProps {
  title: string;
  message: string;
  actionUrl?: string;
}

export function NotificationEmail({
  title,
  message,
  actionUrl
}: NotificationEmailProps) {
  return (
    <div style={{ fontFamily: "Arial", lineHeight: 1.5 }}>
      <h2>{title}</h2>
      <p>{message}</p>
      {actionUrl ? (
        <p>
          <a href={actionUrl} target="_blank" rel="noreferrer">
            Ver detalle
          </a>
        </p>
      ) : null}
    </div>
  );
}
