interface Props {
    title?: string;
}

export const UnitExample: React.FC<Props> = ({ title = "UNTITLED" }) => {
    return <div>{title}</div>;
};
