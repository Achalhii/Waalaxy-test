import styled from 'styled-components';

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100px;
`;

const QueueText = styled.span`
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: center;
`;

const QueueAction = styled.span<{ last: boolean, first: boolean }>`
    border-width: 1px;
    border-color: rgb(119, 119, 120);
    border-style: solid;
    width: 100px;
    line-height: 40px;
    min-height: 40px;
    text-align: center;
    vertical-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    background: #dde8e4;
    ${props => props.last ? 'border-bottom-left-radius: 20px; border-bottom-right-radius: 20px;' : ''}
    ${props => props.first ? 'border-top-left-radius: 20px; border-top-right-radius: 20px;' : ''}
`;

type Props = {
    queueContent: string[]
}
const QueueFIFO = ({ queueContent }: Props) => {
    return (
        <Content>
            {queueContent.length > 0 ? (
                <>
                    <QueueText>First-Out</QueueText>
                        {queueContent.map((action, index) => (
                            <QueueAction
                              key={index}
                              last={queueContent.length-1 === index}
                              first={index === 0}
                            >{action}</QueueAction>
                        ))}
                    <QueueText>Last-Out</QueueText>
                </>
            ) : <span>Vide</span>}
        </Content>
    );
};

export default QueueFIFO;
