import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2023-10-01', amount: 200, type: 'Income', brand: 'Nike' },
    { id: 2, date: '2023-10-02', amount: 150, type: 'Expense', brand: 'Adidas' },
  ]);
  const [newTransaction, setNewTransaction] = useState({ date: '', amount: '', type: '', brand: '' });
  const [editTransaction, setEditTransaction] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const addTransaction = () => {
    setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }]);
    setNewTransaction({ date: '', amount: '', type: '', brand: '' });
  };

  const editExistingTransaction = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    setEditTransaction(transaction);
  };

  const saveEditedTransaction = () => {
    setTransactions(transactions.map((t) => (t.id === editTransaction.id ? editTransaction : t)));
    setEditTransaction(null);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Input name="date" placeholder="Date" value={newTransaction.date} onChange={handleInputChange} />
            <Input name="amount" placeholder="Amount" value={newTransaction.amount} onChange={handleInputChange} />
            <Select onValueChange={(value) => handleSelectChange('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Income">Income</SelectItem>
                <SelectItem value="Expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleSelectChange('brand', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nike">Nike</SelectItem>
                <SelectItem value="Adidas">Adidas</SelectItem>
                <SelectItem value="Puma">Puma</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addTransaction}>Add Transaction</Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.brand}</TableCell>
                    <TableCell>
                      <Button variant="outline" onClick={() => editExistingTransaction(transaction.id)}>Edit</Button>
                      <Button variant="destructive" onClick={() => deleteTransaction(transaction.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {editTransaction && (
        <Dialog open={true} onOpenChange={() => setEditTransaction(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Transaction</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <Input name="date" placeholder="Date" value={editTransaction.date} onChange={(e) => setEditTransaction({ ...editTransaction, date: e.target.value })} />
              <Input name="amount" placeholder="Amount" value={editTransaction.amount} onChange={(e) => setEditTransaction({ ...editTransaction, amount: e.target.value })} />
              <Select onValueChange={(value) => setEditTransaction({ ...editTransaction, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Income">Income</SelectItem>
                  <SelectItem value="Expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setEditTransaction({ ...editTransaction, brand: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nike">Nike</SelectItem>
                  <SelectItem value="Adidas">Adidas</SelectItem>
                  <SelectItem value="Puma">Puma</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={saveEditedTransaction}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Index;