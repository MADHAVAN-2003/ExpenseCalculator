interface FormValues {
  transactionType: string;
  amount: number;
  reason: string;
}

function useBalanceSheetFilter(
  newFormValues: FormValues[]
): [number, number, number] {
  const incomeFilter = newFormValues.filter(
    (transaction) => transaction.transactionType === "income"
  );
  const expenseFilter = newFormValues.filter(
    (transaction) => transaction.transactionType === "expense"
  );

  const totalIncome = incomeFilter.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expenseFilter.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  const savings = totalIncome - totalExpense;

  return [totalIncome, totalExpense, savings];
}

export default useBalanceSheetFilter;
