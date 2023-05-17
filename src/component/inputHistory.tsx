import { VStack, Heading, TableContainer, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { InputContext } from '../page/mainFunction';

export default function InputHistory() {
  const { inputValues, gramTotal, meterCount, setInputValues, setGramTotal, setMeterCount } = useContext(InputContext);

  const handleDelete = (index: number) => {
    const newInputValues = [...inputValues];
    newInputValues.splice(index, 1);
    setInputValues(newInputValues);
    const result: number = gramTotal + inputValues[index].gram;
    setGramTotal(result);
    setMeterCount(meterCount - inputValues[index].gram);
    if (meterCount - inputValues[index].gram < 0) {
      setMeterCount(0);
    }
    localStorage.setItem('gramTotal', result.toString());
    localStorage.setItem('inputHistory', JSON.stringify(newInputValues));
  };

  return (
    <VStack mb={10} textAlign='center'>
      {inputValues.length > 0 && (
        <TableContainer>
          <Heading size='sm' mb={5}>
            摂取履歴
          </Heading>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th>食品名</Th>
                <Th>摂取量</Th>
              </Tr>
            </Thead>
            <Tbody>
              {inputValues.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.name}</Td>
                  <Td>{item.gram}g</Td>
                  <Td>
                    <Button colorScheme='red' variant='outline' size='xs' onClick={() => handleDelete(index)}>
                      削除
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </VStack>
  );
}
