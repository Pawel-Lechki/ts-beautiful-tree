import styled from "@emotion/styled";

type RootProps = {
    level?: number
}

export const Root = styled.div<RootProps>`  
    display: flex;
    padding: 4px;
    padding-left: ${(props) => (props.level! - 1) * 20}px;
`

export const Icon = styled.div`
box-sizing: border-box;
    padding: 0 8px;
    width: 28px;
    text-align: center;
    cursor: pointer;
`

export const Label = styled.div`
    flex: 1;
    `