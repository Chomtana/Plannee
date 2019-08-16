import React from 'react'
import RefContainer from './../refsystem/RefContainer';
import useGlobalRef from '../refsystem/useGlobalRef';
import ChartSummary from './../component/Summary/ChartSummary';
import VBox from './../component/VBox';
import ChartDetail from './../component/Summary/ChartDetail';
import BackButton from './../component/BackButton';


export default function SummaryBak() {
  const refs = new RefContainer();
  refs.records = useGlobalRef("records");
  const records = refs.records();
  refs.categories = useGlobalRef("categories");
  const categories = refs.categories();
  
  var totalsum = 0;
  var sum_bycategory = {}
  for(var record of records) {
    if (!sum_bycategory[record.category.text]) sum_bycategory[record.category.text] = {sum: 0};
    sum_bycategory[record.category.text].sum += parseFloat(record.value);
    totalsum += record.value;
  }

  for(var category_text in sum_bycategory) {
    sum_bycategory[category_text].percent = sum_bycategory[category_text].sum / totalsum * 100;
  }

  var data = []
  for(var category_text in sum_bycategory) {
    data.push({name: category_text, value: sum_bycategory[category_text].sum})
  }

  const passmore = {sum_bycategory, data};

  return (
    <VBox>
      <BackButton></BackButton>
      <ChartSummary {...refs} {...passmore}></ChartSummary>
      <ChartDetail {...refs} {...passmore}></ChartDetail>
    </VBox>
  )
}